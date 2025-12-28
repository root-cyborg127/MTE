# Mumbai Tech Engineers – Gmail Template Assistant

This project is a lightweight Chrome extension built to simplify how we send professional emails from Gmail.

It allows you to create, manage, and insert **clean, branded HTML email templates directly inside Gmail**, without switching tools, copying code, or rewriting the same emails again and again.

The extension was designed with **engineering, export, and service-based businesses** in mind — especially for repetitive emails like registrations, quotations, invoices, and service reports.

---

## Why this exists

Writing the same formal emails every day wastes time and leads to inconsistency.

This tool solves that by:
- keeping all templates in one place
- ensuring branding stays consistent
- letting you edit and reuse templates quickly
- working entirely inside Gmail (no external dashboard)

No login. No backend. No tracking.

---

## What you can do with it

### Use ready-made professional templates
The extension comes with built-in templates for:
- Company registration emails  
- Quotations  
- Invoices  
- Payment receipts  
- Service reports  

Each template follows a clean, light theme with proper spacing and formatting.

---

### Create your own templates
You can also:
- create custom templates using HTML
- name and save them
- preview them before inserting
- reuse them later (they stay saved in your browser)

This is useful when dealing with different clients or formats.

---

### Work directly inside Gmail
- Templates are inserted directly into the Gmail compose box
- Works with **new emails, replies, and forwards**
- Subject lines are filled automatically
- No Gmail API or special permissions required

It behaves like a natural part of Gmail.

---

## Interface & usability

- Floating panel that doesn’t block Gmail
- Can be dragged anywhere on the screen
- Can be resized using the mouse
- Light and dark mode support
- Clean, distraction-free layout

Everything is designed to stay out of your way.

---

## Logo handling

The email logo is loaded using a **public Google Drive image link**, which ensures:
- the logo is always visible to recipients
- no broken images
- no dependency on attachments or CID references

This approach is stable and works consistently in Gmail.

---

## Project structure

mumbaitech-mailer/
├── manifest.json
├── mumbaitech_gmail.js
└── logo.png

The entire logic lives in a single JavaScript file for simplicity and transparency.

---

## Installation (local use)

1. Download or clone this repository  
2. Open Chrome and go to:
chrome://extensions

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the project folder

The extension will now be available in Gmail.

---

## How to use

1. Open Gmail  
2. Click **Compose**  
3. Click the **MTE** button in the Gmail toolbar  
4. Select a template or create one  
5. Preview → Insert → Send  

That’s it.

---

## Privacy & safety

- The extension only runs on `mail.google.com`
- No data is collected or sent anywhere
- No analytics, trackers, or background services
- All templates are stored locally in your browser

You stay fully in control.

---

## Sharing & distribution

You can share this project in multiple ways:
- GitHub (recommended for teams or private use)
- Chrome Web Store (recommended for public users)

Direct `.crx` distribution is not recommended for public sharing due to Chrome restrictions.

---

## Development notes

- Chrome Extension (Manifest v3)
- Vanilla JavaScript
- Gmail DOM-based integration
- No external libraries

The goal was reliability and simplicity, not complexity.

---

## Developed by

**root-cyborg127**  
https://github.com/root-cyborg127

This project was built out of a real need, not as a demo.

---

## License

This project is provided as-is.

You are free to:
- use it internally
- modify it for your workflow
- share it with attribution

If you plan to redistribute it commercially, please credit the original author.
