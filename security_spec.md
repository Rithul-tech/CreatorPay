# Security Specification: CreatorPay Firebase Integration

This document defines the security boundaries, data invariants, and defensive validation rules governing the Firestore database for CreatorPay.

## 1. Data Invariants

1. **User Profile Ownership**: A user profile document at `/users/{userId}` can only be created and updated by the authenticated user matching `userId`.
2. **Email Verification Requirement**: All database writes (create, update, delete) require a valid, email-verified authenticated user session (`request.auth.token.email_verified == true`).
3. **Calculation Ownership**: A saved calculation document at `/users/{userId}/saved_calculations/{calcId}` belongs strictly to the user matching `{userId}`.
4. **Calculations Immutability**: Fields such as `userId` and `createdAt` are immutable after a calculation is saved.
5. **Payload Schema Integrity**: Saved calculations must strictly contain all required parameters (platform, format, niche, views, RPM) and value ranges.
6. **No Self-Privilege Escalation**: Users cannot self-assign role-based claims. No custom claims are assumed.

---

## 2. The "Dirty Dozen" Payloads (Defensive Attack Matrix)

Here are 12 malicious payloads designed to bypass security, and why they must fail.

### Category A: User Profiles (`/users/{userId}`)

#### Attack Payload 1: Profile Hijacking (Identity Spoofing)
*   **Target**: `/users/legitimate_user_123`
*   **Payload**: `{"uid": "attacker_456", "email": "attacker@gmail.com", "displayName": "Attacker"}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Attempting to write into another user's profile path.

#### Attack Payload 2: Email Spoofing (Unverified Sessions)
*   **Target**: `/users/attacker_456`
*   **Payload**: `{"uid": "attacker_456", "email": "admin@creatorpay.com", "displayName": "Fake Admin"}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Authenticated sessions where `email_verified` is `false` must be rejected.

#### Attack Payload 3: Injection of Arbitrary Metadata
*   **Target**: `/users/attacker_456`
*   **Payload**: `{"uid": "attacker_456", "email": "attacker@gmail.com", "displayName": "A" * 5000, "role": "admin"}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Exceeding field length bounds and attempting self-escalation with `role: admin`.

---

### Category B: Saved Calculations (`/users/{userId}/saved_calculations/{calcId}`)

#### Attack Payload 4: Calculation Hijacking (Cross-User Write)
*   **Target**: `/users/legitimate_user_123/saved_calculations/calc_abc`
*   **Payload**: `{"id": "calc_abc", "userId": "legitimate_user_123", "platform": "youtube", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Attacker trying to write calculation presets into a victim's subcollection.

#### Attack Payload 5: Target Owner ID Spoofing
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"id": "calc_xyz", "userId": "legitimate_user_123", "platform": "youtube", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Attacker trying to save a calculation under their own subcollection but claiming it belongs to another user `userId`.

#### Attack Payload 6: Negative/Massive Views Injection (Resource Poisoning)
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"userId": "attacker_456", "monthlyViews": -99999, "platform": "youtube", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Injecting toxic or negative integers for view velocity.

#### Attack Payload 7: Invalid Platform Enum Injection
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"userId": "attacker_456", "platform": "instagram_reels", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Bypassing allowed platform string constraints.

#### Attack Payload 8: Immutable Update Violation (Changing Owner)
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz` (Existing)
*   **Payload (Update)**: `{"userId": "another_user_abc"}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Attempting to alter the immutable `userId` field post-creation.

#### Attack Payload 9: Client-Side Timestamp Spoofing
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"userId": "attacker_456", "createdAt": "2030-01-01T00:00:00Z", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Injecting custom future timestamps instead of utilizing `request.time`.

#### Attack Payload 10: Extraneous Ghost Fields (Shadow Update)
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"userId": "attacker_456", "isPremiumSubscriber": true, ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Injecting unauthorized schema attributes into documents via client updates.

#### Attack Payload 11: Value Poisoning via Type Bypass
*   **Target**: `/users/attacker_456/saved_calculations/calc_xyz`
*   **Payload**: `{"userId": "attacker_456", "lowPayout": "one million dollars", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Supplying string values instead of numeric types.

#### Attack Payload 12: Orphaned/Poisoned Path Variable Injection
*   **Target**: `/users/attacker_456/saved_calculations/%EF%BF%BDinvalid_id`
*   **Payload**: `{"userId": "attacker_456", ...}`
*   **Expected Result**: `PERMISSION_DENIED`
*   **Vulnerability Target**: Injecting malicious unicode URL characters into document ID fields to trigger downstream lookup parser crashes.

---

## 3. Test Specification & Verifications

The `firestore.rules` are structured to guarantee complete denial of all above attacks:

```ts
// Specifications of validation criteria
function isOwner(userId) {
  return request.auth != null && request.auth.uid == userId;
}

function isEmailVerified() {
  return request.auth.token.email_verified == true;
}

function isValidUserProfile(data) {
  return data.keys().hasAll(['uid', 'email', 'createdAt']) &&
         data.keys().size() <= 6 &&
         data.uid == request.auth.uid &&
         data.email is string &&
         data.email.size() <= 256;
}
```
All read/write endpoints require explicit validation checking.
