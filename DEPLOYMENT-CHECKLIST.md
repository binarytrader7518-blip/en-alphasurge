# Deployment checklist — Alpha Surge

## Deploy
1. Push this folder to a Git repo (or use `vercel deploy --prod`) and attach it to the Vercel project for **en-alphasurge.vercel.app**. No build step is needed (static site).
2. `vercel.json` sets up `/order` → order.html, server-side 302 redirects `/go/2`, `/go/3`, `/go/6` → your affiliate URL (fixed allowlist, no open redirect), and noindex headers on /order and /go.

## Verify after deploy
- https://en-alphasurge.vercel.app/key.txt returns 200 and exactly `77bafe577643bd07125da1945997d172`
- https://en-alphasurge.vercel.app/sitemap.xml and https://en-alphasurge.vercel.app/robots.txt load
- https://en-alphasurge.vercel.app/go/6 returns 302 to the affiliate URL; https://en-alphasurge.vercel.app/go/9 returns 404
- Wait 7 s on the homepage: the centered offer modal appears once, then not again for 24 h

## Bing Webmaster Tools
1. Add the site (or import from Google Search Console) and verify ownership with the meta tag or DNS method Bing gives you.
2. Submit the sitemap: https://en-alphasurge.vercel.app/sitemap.xml
3. URL Submission: paste the URL list from the chat reply.
4. Run `node scripts/indexnow.mjs` after every deploy (Node 18+). It submits only changed pages and logs the HTTP status. HTTP 200/202 means received, not indexed.
5. Use URL Inspection on the homepage and price page, and watch Crawl errors / Search performance weekly.

## IndexNow manual URLs
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/product-overview.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/how-it-works.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/benefits.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/focus-areas/index.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/focus-areas/energy-stamina.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/focus-areas/circulation.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/focus-areas/stress-balance.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/focus-areas/drive-confidence.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/reviews.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/index.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/tongkat-ali-research-guide.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/maca-root-for-men.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/ashwagandha-everyday-stress.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/l-arginine-nitric-oxide.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/horny-goat-weed-icariin.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/blog/male-vitality-daily-habits.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/faq.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/product-review.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/price.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/where-to-buy.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/pros-and-cons.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/alternatives.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/affiliate-disclosure.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/privacy-policy.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/terms-and-conditions.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-alphasurge.vercel.app/supplement-disclaimer.html&key=77bafe577643bd07125da1945997d172&keyLocation=https://en-alphasurge.vercel.app/key.txt