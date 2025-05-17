export async function GET(request) {
    // Get the target URL from query parameters
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
  
    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing URL parameter' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  
    try {
      // Fetch the remote resource
      const response = await fetch(targetUrl);
      
      if (!response.ok) {
        throw new Error(`Remote server responded with status ${response.status}`);
      }
  
      // Create a new response with CORS headers
      const proxyResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      });
  
      return proxyResponse;
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  }
  
  export async function OPTIONS() {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }