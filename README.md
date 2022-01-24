# CourseKit Nuxt Demo

[CourseKit](https://coursekit.dev) is the easiest way to create a full-featured, custom online course, exactly how you want it. Use your favorite frontend tools - no server required!

This repo is for the Nuxt Demo which provides both a case study in how to implement CourseKit using Nuxt.js as well as a template you can clone for your own CourseKit project.

## Live demo

[https://coursekit-nuxt-demo.netlify.app/](https://coursekit-nuxt-demo.netlify.app/)

## Installation and setup

If you'd like to install this locally you should follow the instructions in the [CourseKit Quickstart Guide](https://github.com/course-kit/guides/blob/master/quick-start.md).

## Testing Stripe webhook

Ensure that you've first set up a Stripe account and created a product as explained in [this guide]().

You'll need to have Stripe CLI installed. Then, run it in a separate terminal:

```
$ stripe listen --forward-to localhost:8888/.netlify/functions/purchase-callback
```

In the terminal output it will print the webhook signing secret e.g. *whsec_juK....*. Add this value to your .env file

```
STRIPE_WEBHOOK_SECRET=whsec_juKuS....
```

Now, start (or restart) the Netlify dev server. By default, this will be at port 8888

```
netlify dev
```

In yet another terminal window, trigger a test event

```
stripe trigger checkout.session.completed
```
