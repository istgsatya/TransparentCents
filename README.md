# Transparent Cents

A system for tracking how donations are actually used after they are sent.

---

## Overview

Donating money is easy. Trusting what happens after is not.

Most platforms confirm the payment and stop there. There is no clear way to see where the money goes, who uses it, or whether it was used as intended.

Transparent Cents is built to remove that uncertainty. It gives donors visibility and a say in how funds are used, without relying on blind trust.

---

## Product Flow

### Donation

Users contribute to a campaign. The funds are stored on-chain and remain visible.

![Donation](./assets/donate.png)

The key point here is that the money does not move silently after being sent.

---

### Fund Request

An organization cannot directly use the funds. It must first submit a request explaining the purpose and the amount.

![Request](./assets/request.png)

This creates a clear intent before any spending happens.

---

### Voting

Only contributors to that campaign can vote on whether the request should be approved.

![Voting](./assets/vote.png)

If the request does not get enough support, nothing moves.

---

### Execution

Once approved, the smart contract releases the funds automatically.

![Execution](./assets/execute.png)

There is no manual control at this stage. The system enforces the decision.

---

### Proof of Use

After using the funds, the organization must provide proof in the form of receipts, images, or updates.

![Proof](./assets/proof.png)

This step connects the on-chain action to real-world impact.

---

### Verification

Donors review the submitted proof. If something does not add up, it can be reported.

![Verification](./assets/verify.png)

Repeated violations lead to removal from the platform.

---

## What this changes

Money is no longer sent into a black box.
Spending is no longer based on trust alone.
Every step from contribution to usage becomes visible.

---

## System Design

The backend manages users, campaigns, and request flows.
Smart contracts handle fund storage, voting logic, and execution.
The frontend connects user actions to blockchain interactions through wallet integration.

![Architecture](./assets/architecture.png)

---

## Stack

The backend is built using Java and Spring Boot with PostgreSQL.
The frontend uses Next.js with TypeScript.
Blockchain logic is implemented using Solidity and deployed on Sepolia.

---

## Current State

The full flow from donation to proof verification is implemented.
Work is ongoing to improve stability and simplify the user experience.

---

## Direction

The next step is to test this system with real organizations and refine it based on actual usage.
Future additions include stronger verification, better scoring of transparency, and a mobile-first experience.

---

## Running Locally

```bash id="runlocal"
git clone https://github.com/your-username/TransparentCents.git

cd backend
./mvnw spring-boot:run

cd frontend
npm install
npm run dev
```

---

## Closing

This project is built around a simple idea.

If money is donated, its usage should not be hidden.

