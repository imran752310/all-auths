import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
   <div className="w-[90%] mx-auto">
 <LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>
   </div>
  );
}
