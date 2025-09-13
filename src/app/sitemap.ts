export default async function sitemap() {
  const baseUrl = 'https://muizznwali.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/ai/chatbot`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/ai/drawing`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/Extraapps`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/Extraapps/SpaceAdderAndCapitalizer`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator/app/delete`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator/privacy-policy`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/test/todo/drawing/svg`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/test-firebase`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/todo`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/todo/test/imagebuttons`,
      lastModified: new Date().toISOString(),
    },
  ]
}