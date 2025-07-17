step1: kinde login in kinde side

step2: install SDK of kinde
npx nypm add @kinde-oss/kinde-auth-nextjs

step3: create .env.local 
paste all 
INDE_CLIENT_ID=------------
KINDE_CLIENT_SECRET=;;;;;;;;;;;;;;;;;;;
KINDE_ISSUER_URL=--------------------
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

step4: App/api/auth/[kinde-auth]route.js
import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth();

step5: Register, Login Button
code :
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
   <div>
 <LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>
   </div>
  );
}
