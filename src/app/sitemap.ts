import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://muizznwali.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ai/chatbot`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ai/drawing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/Extraapps`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/Extraapps/SpaceAdderAndCapitalizer`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator/app/delete`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/heavy-duty-calculator/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/test/todo/drawing/svg`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/test-firebase`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/todo`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/todo/test/imagebuttons`,
      lastModified: new Date(),
    },
  ]
}