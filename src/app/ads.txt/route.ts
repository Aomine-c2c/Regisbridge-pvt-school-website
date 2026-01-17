export async function GET() {
  const adsContent = 'google.com, pub-5031801301729089, DIRECT, f08c47fec0942fa0'
  
  return new Response(adsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
