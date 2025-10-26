---
slug: NinjaOne-Ticketing-Bypass
title: Allowing NinjaOne Ticketing Through Email Security
authors: sheath
tags: [ticketing, ninjaone, email security, proofpoint]
---

# Allowing NinjaOne Ticketing Emails Through Proofpoint and Microsoft 365

When using Proofpoint for email filtering, you may notice that automatic forwarding rules stop working. [Proofpoint no longer supports automatic forwarding](https://help.proofpoint.com/Proofpoint_Essentials/Email_Security/Administrator_Topics/Other_Features/Issues_with_Email_auto-forwarding), which means messages sent from your support address to NinjaOne can be blocked or dropped. To resolve this, you can create a connector and mail flow rule in Exchange Online that securely bypass outbound Proofpoint scanning for messages sent to NinjaOne’s ticketing system.

---

## Overview

You’ll create two items:

1. A **connector** that routes messages directly to Microsoft 365, bypassing Proofpoint outbound scanning.  
2. A **mail flow rule** that redirects NinjaOne ticketing messages through that connector.

---

## Step 1: Create the Connector

1. Open the **Exchange Admin Center (EAC)** at [https://admin.exchange.microsoft.com](https://admin.exchange.microsoft.com)
2. Go to **Mail Flow** → **Connectors**
3. Click **Add a connector**
   - **From:** Office 365  
   - **To:** Partner organization
4. Configure the connector as shown below:

   ![Bypass Proofpoint Connector Screenshot](https://i.imgur.com/02rZC4F.png)

5. Use the following configuration:
   - **Name:** `Bypass Proofpoint Connector`
   - **Status:** On
   - **Use of connector:** Only when a transport rule redirects messages to this connector
   - **Routing:** Use the MX record associated with the partner’s domain
   - **Security restrictions:** Require TLS and connect only if the recipient’s email server certificate is issued by a trusted CA

6. When prompted to **validate the connector**, use the **inbound email address** provided by **NinjaOne Ticketing**.

7. After validation completes successfully, click **Finish**.

---

## Step 2: Create the Mail Flow Rule

1. In the **Exchange Admin Center**, go to **Mail Flow** → **Rules**
2. Click **Add a rule** → **Create a new rule**
3. Configure it as shown below:

   ![Bypass Proofpoint Rule - Settings Screenshot](https://i.imgur.com/tZdcIGd.png)

   - **Name:** `Bypass Proofpoint for NinjaOne Ticketing`
   - **Apply this rule if:** The recipient domain is `rmmservice.com`
   - **Do the following:** Redirect the message to the following connector → `Bypass Proofpoint Connector`

4. Under **Settings**, configure as shown:

   ![Bypass Proofpoint Rule - Conditions Screenshot](https://i.imgur.com/rW7kNUb.png)

   - **Priority:** As high as possible
   - **Rule mode:** Enforce  
   - **Severity:** Low  
   - **Stop processing more rules:** Checked  
   - **Match sender address in message:** Header

5. Save the rule.

---

## Step 3: Test and Verify

Send a test email or trigger a ticket notification from NinjaOne.  
If configured correctly:
- The message should bypass Proofpoint filtering.  
- The message should still use TLS encryption.  
- Delivery should complete successfully to the target mailbox.

You can confirm successful routing by reviewing **Message Trace** in the Exchange Admin Center.

---

## Why Proofpoint Blocks Forwarding

Proofpoint Essentials discontinued support for email auto-forwarding due to abuse and spoofing risks. Automatic forwarding is often used by threat actors to exfiltrate sensitive data or redirect messages externally. As a result, Proofpoint enforces this block by design even for legitimate use cases like helpdesk systems.

By creating a targeted connector and mail flow rule, you maintain secure message handling while allowing legitimate ticketing messages to pass.

---

## Security Notes

- Only use this bypass for known, trusted systems such as NinjaOne.  
- Keep TLS and certificate validation enabled.  
- Avoid using wildcard or broad domain rules.  
- Regularly review mail flow logs to confirm that only intended messages are being routed through the connector.