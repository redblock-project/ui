/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    const response = await resolve(request)
  
    if (request.path.startsWith('/ru')) {
      return {
        ...response,
        // @ts-ignore
        body: response.body.replace('<html lang="en">', '<html lang="ru">')
      }
    }
  
    if (request.path.startsWith('/cn')) {
      return {
        ...response,
        // @ts-ignore
        body: response.body.replace('<html lang="en">', '<html lang="cn">')
      }
    }
  
    return response
  }