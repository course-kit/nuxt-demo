# CourseKit Nuxt Demo

[CourseKit](https://coursekit.dev) is the easiest way to create a full-featured, custom online course, exactly how you want it. Use your favorite frontend tools - no server required!

This repo is for the Nuxt Demo which provides both a case study in how to implement CourseKit using Nuxt.js as well as a template you can clone for your own CourseKit project.

For detailed instructions on installation take a look at the [CourseKit Quick Start Guide](https://github.com/course-kit/guides/blob/master/quick-start.md).

## Live demo

[https://coursekit-nuxt-demo.netlify.app/](https://coursekit-nuxt-demo.netlify.app/)

## Installation and setup

> Note: you'll need [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed.

Clone repo, enter dir, and install NPM modules:

```
$ cd nuxt-demo
$ npm i
```

Next, create a .env file with the following values set:

```
NODE_ENV=development
COURSEKIT_SCHOOL_ID=<your school ID>
```

Run the Netlify dev server:

```
$ netlify dev
```

## Testing Stripe webhook

Ensure that you've first set up a Stripe account and created a product as explained in [part 2 of the quickstart guide](https://github.com/course-kit/guides/blob/master/quick-start-part-2.md).

Ensure you have Stripe CLI installed. Run the listener in a separate terminal:

```
$ stripe listen --forward-to localhost:8888/.netlify/functions/purchase-callback
```

In the terminal output it will print the webhook signing secret e.g. *whsec_juK....*. Add this value to your .env file

```
STRIPE_WEBHOOK_SECRET=whsec_juKuS....
```

Now, start (or restart) the Netlify dev server. This should use the default port value 8888.

```
$ netlify dev
```

In yet another terminal window, trigger a test event:

```
$ stripe trigger checkout.session.completed
```
