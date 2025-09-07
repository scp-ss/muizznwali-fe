import Link from 'next/link';

const extraApps = [
  {
    id: 'space-adder-capitalizer',
    name: 'Space Adder & Capitalizer',
    description: 'Transform your text by capitalizing all letters and adding strategic spacing. Perfect for creating stylized text effects.',
    href: '/Extraapps/SpaceAdderAndCapitalizer',
    icon: '🔤',
    features: [
      'Capitalize all letters',
      'Add 2 spaces after each character',
      'Extra spacing for existing spaces',
      'Real-time transformation'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  // Add more apps here as they are created
  // {
  //   id: 'app-name',
  //   name: 'App Name',
  //   description: 'App description',
  //   href: '/extraapps/app-name',
  //   icon: '📱',
  //   features: ['Feature 1', 'Feature 2'],
  //   color: 'from-green-500 to-teal-600'
  // }
];

export default function ExtraApps() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Extra Apps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of specialized tools and utilities designed to enhance your productivity and creativity.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extraApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* App Header */}
              <div className={`bg-gradient-to-r ${app.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{app.icon}</span>
                  <Link
                    href={app.href}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Try Now →
                  </Link>
                </div>
                <h3 className="text-xl font-bold mb-2">{app.name}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* App Features */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Features
                </h4>
                <ul className="space-y-2">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="mt-6">
                  <Link
                    href={app.href}
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${app.color} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}
                  >
                    <span className="mr-2">{app.icon}</span>
                    Launch App
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              More Apps Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly developing new tools and utilities. Stay tuned for more exciting apps that will enhance your workflow and creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">Text Processing</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Data Visualization</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Productivity Tools</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Creative Utilities</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            Built with ❤️ using Next.js, TypeScript, and Python FastAPI
          </p>
        </div>
      </div>
    </div>
  );
}