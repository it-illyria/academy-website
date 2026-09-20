# Email Deliverability Setup for Lika Academy

## Why Emails Go to Spam

The default Resend setup uses `onboarding@resend.dev` as the sender domain. Email providers (Gmail, Outlook, etc.) flag this because:
- The sending domain doesn't match your website domain
- No SPF/DKIM records verify you own the domain
- Shared sending domain = low reputation

## Step-by-Step Fix

### Step 1: Add Your Domain to Resend

1. Go to [resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `likaacademy.al`
4. Resend will show you DNS records to add

### Step 2: Add DNS Records

Go to your domain registrar (Namecheap, GoDaddy, etc.) and add these records:

**SPF Record (TXT):**
```
Type: TXT
Name: @
Value: v=spf1 include:send.resend.com ~all
```

**DKIM Record (TXT):**
```
Type: TXT
Name: resend._domainkey
Value: (Resend provides this — it's a long string)
```

**DMARC Record (TXT):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:info@likaacademy.al
```

### Step 3: Wait for Verification

- DNS propagation takes 5-60 minutes
- Resend will verify automatically and show "Verified" status

### Step 4: Update Environment Variables

In `.env.local` (and Vercel dashboard):
```
EMAIL_FROM=Lika Academy <noreply@likaacademy.al>
REPLY_TO_EMAIL=info@likaacademy.al
```

### Step 5: Test

1. Submit a contact form on the website
2. Check your email inbox (not spam)
3. Verify the email has:
   - Correct sender: "Lika Academy <noreply@likaacademy.al>"
   - Reply-to: info@likaacademy.al
   - Professional HTML template
   - Unsubscribe/explanation text in footer

## What We Already Did (Code Level)

These anti-spam measures are already implemented:

| Measure | Status |
|---------|--------|
| Professional HTML template with proper structure | ✅ |
| DOCTYPE, charset, viewport meta tags | ✅ |
| Text-based content (no image-only emails) | ✅ |
| Physical address in footer (Kamëz, Tirana) | ✅ |
| Website link in footer | ✅ |
| Explanation text ("You received this because...") | ✅ |
| Reply-To header set | ✅ |
| X-Entity-Ref-ID for deduplication | ✅ |
| Subject prefix [Lika Academy] | ✅ |
| Sanitized user input (no XSS in emails) | ✅ |
| IP anonymization in analytics | ✅ |

## Spam Score Checklist

After setup, test with [mail-tester.com](https://www.mail-tester.com):

- [ ] SPF: PASS
- [ ] DKIM: PASS
- [ ] DMARC: PASS
- [ ] No blacklisted IPs
- [ ] HTML email validates
- [ ] Score: 9/10 or higher

## Common Issues

| Problem | Solution |
|---------|----------|
| Emails go to spam | Verify domain in Resend + add DNS records |
| Emails not received | Check RESEND_API_KEY is set correctly |
| Wrong sender name | Update EMAIL_FROM in .env.local |
| Can't reply to emails | REPLY_TO_EMAIL must be a real mailbox |
| Gmail shows "via resend.dev" | Domain not verified — add SPF/DKIM |
