# On Wheels Auto

A responsive one-page website for On Wheels Auto. Plain HTML, CSS and JavaScript, with no runtime dependencies.

## Local development

```sh
npm run dev
```

Open http://127.0.0.1:3000. `npm run build` produces `dist/`; `npm run check` checks JavaScript syntax.

## Vercel

Import this GitHub repository into Vercel. The included `vercel.json` sets the build command and output directory. A custom domain can be added later under the project's Domains settings; update the Google Business Profile website link when the final domain is ready.

## Service requests

The guided questionnaire collects service type, vehicle, symptoms, drivability, contact information, location and preferred timing. It prepares an SMS to **302-983-0433**. The customer must send the message in their messaging app. The page never claims a message was delivered or an appointment booked. A copyable request is available on desktop or if no SMS handler exists.

No booking information is stored or sent to a server. No email/SMS provider, database, API key or account is required. The owner confirms pricing, coverage and scheduling directly.

## Content

- Main content: `public/index.html`
- Styling: `public/style.css`
- Questionnaire: `public/app.js`
- Supplied photos, converted to optimized WebP without embedded EXIF: `public/images/`

Metadata and AutoRepair structured data include the supplied phone number, service categories, regions, Instagram and Google Maps links. No invented ratings, testimonials, business hours or street address. Add the final canonical URL and absolute social image URL after selecting the long-term domain.
