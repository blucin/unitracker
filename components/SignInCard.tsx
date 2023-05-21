"use client";

export default function SignInCard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button>Github</button>
      <button>Google</button>
      <p>Or continue with</p>
      <input type="email"></input>
      <button>Continue</button>
      <p>No account?</p>
      <button>Sign up</button>
    </div>
  );
}
