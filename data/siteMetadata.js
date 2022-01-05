const siteMetadata = {
  title: 'Justin\'s Blog',
  author: 'Justin Phu',
  headerTitle: 'Code Monkey',
  description: 'Software Engineer documenting the journey that is life. This is just me trying to make sense of my world. I write about system programming, self development and pretty much anything that pops into my head. Enjoy your time here :).',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://blog.justinphu.dev',
  siteRepo: 'https://github.com/jqphu/blog',
  siteLogo: '/static/images/monkey.png',
  avatar: '/static/images/avatar.png',
  nft: '/static/images/thingdom5209.png',
  image: '/static/images/monkey.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'me@justinphu.dev',
  github: 'https://github.com/jqphu',
  twitter: 'https://twitter.com/jqphu',
  ethereum: 'https://app.ens.domains/name/jqphu.eth/details',
  solana: 'https://naming.bonfida.org/#/domain/jqphu',
  locale: 'en-US',
  analytics: {
    // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: 'blog.justinphu.dev', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    googleAnalyticsId: 'UA-167304725-1', // e.g. UA-000000-2 or G-XXXXXXX
  },
  // TODO:
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'preferred_color_scheme',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
