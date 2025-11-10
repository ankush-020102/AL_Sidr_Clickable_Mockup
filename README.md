# Pricing & Checkout Flow App

A responsive **React + TypeScript + Vite** application that allows users to explore pricing plans, proceed to checkout, and complete or cancel their purchase.  
The project demonstrates UI/UX best practices, routing, form validation, and state management using Redux or local persistence.

---# Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Screenshots](#screenshots)
- [Assumptions / Notes](#assumptions--notes)
- [Deliverables](#deliverables)
- [Project Structure](#project-structure)
- [Author](#author)

---

## Overview

This project replicates a **modern SaaS or blockchain pricing and checkout flow**.  
It includes a pricing page where users can choose a plan, a checkout page for billing info, and success/cancel pages after the payment simulation.

The app is designed to showcase:

- State management in a multi-step flow
- Reusable UI components with Tailwind CSS
- Smooth navigation using React Router
- Responsive layout for both desktop and mobile

---

## Features

- Pricing page with multiple plans and plan selection
- Checkout page with form validation (Formik + Yup)
- Mock payment success and cancel pages
- Redux store or local persistence for user plan data
- Fully responsive layout
- Smooth transitions between steps
- Clean, modern UI using Tailwind CSS

---

## Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Frontend**         | React 18, TypeScript, Vite   |
| **UI Styling**       | Tailwind CSS                 |
| **Routing**          | React Router                 |
| **State Management** | Redux Toolkit / localStorage |
| **Form Validation**  | Formik & Yup                 |
| **Icons**            | Lucide React                 |
| **Build Tool**       | Vite                         |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/pricing-checkout-app.git
```

cd pricing-checkout-app

npm install

## Running the Project

npm run dev

## Screenshots

## Pricing Page

![Pricing Page](src/assets/Pricing-Page.png)

## Checkout Page

![Checkout Page](src/assets/Checkout-Page.png)

## Success Page

![Success Page](src/assets/Success-Page.png)

## Cancel Page

![Cancel Page](src/assets/Cancel-Page.png)

## Assumptions / Notes

- The payment process is mocked; no real transactions occur.
- Selected plan data is persisted locally or via Redux Persist.
- Tested on Chrome, Firefox, and Safari.
- UI is designed to be responsive and minimalistic.

## Deliverables

- Full frontend source code in GitHub repository
- This detailed README with instructions, tech stack, assumptions, and screenshots

## Project Structure

pricing-checkout-app/
├── public/images/ # Screenshots for README
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Pricing, Checkout, Success, Cancel pages
│ ├── store/ # Redux slices
│ ├── utils/ # Helper functions
│ ├── App.tsx # Main App
│ └── main.tsx # Vite entry file
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
