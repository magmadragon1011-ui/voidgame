# VOID HUB — Amazon S3 static website

A responsive, dark-themed link hub with Games, Web tools, Apps, search, and browser-local Favorites.

## Files

- `index.html` — page structure
- `styles.css` — layout and styling
- `app.js` — link directory, search, category filters, favorites, and settings

## Preview locally

You can open `index.html` directly in a browser. For a more realistic local preview, run a static server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Amazon S3

1. Sign in to the AWS Console and open **S3**.
2. Create a bucket with a globally unique name, such as `my-void-hub-12345`.
3. Choose the AWS Region you want. Keep the bucket name; it becomes part of the website endpoint.
4. For the simplest S3 website-endpoint setup, turn off **Block all public access** for this bucket only. Acknowledge the warning. Do not do this to a bucket containing private files.
5. Open the bucket's **Permissions** tab and add this bucket policy, replacing `YOUR_BUCKET_NAME`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForWebsiteFiles",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

6. Open **Properties** → **Static website hosting** → **Edit**.
7. Choose **Enable**, choose **Host a static website**, set the index document to `index.html`, and save.
8. Open the **Objects** tab and upload `index.html`, `styles.css`, and `app.js` (upload the files themselves, not the ZIP).
9. Return to **Properties** → **Static website hosting** and open the **Bucket website endpoint**.

### Important hosting notes

- The S3 website endpoint is HTTP, not HTTPS. For HTTPS and a custom domain, put Amazon CloudFront in front of the bucket and use an Origin Access Control/private bucket setup. Follow AWS's current CloudFront + S3 documentation rather than making the bucket public.
- S3 website hosting is public hosting. Anyone with the endpoint can view the files. Never upload passwords, private data, API keys, or anything confidential.
- AWS may charge for storage, requests, data transfer, and CloudFront. Check current AWS pricing and set a budget alert.
- If you are using an AWS account managed by a school or organization, ask its administrator before changing public-access settings.

## Customize your links

Open `app.js` and edit the `LINKS` array near the top. Each item uses this shape:

```js
{
  id: "unique-id",
  name: "Example",
  category: "Games", // Games, Web tools, or Apps
  icon: "🎮",
  description: "A short description.",
  url: "https://example.com/"
}
```

Use a unique `id` for each item. Favorites are stored in the visitor's browser using localStorage, so they do not sync across devices.

## Notes

- The included links are examples; check each site's terms and your network rules before using them.
- This is a link directory, not a proxy. It does not relay traffic or bypass network restrictions.
- The Google Fonts import is optional. The site still works if that external font service is unavailable.
