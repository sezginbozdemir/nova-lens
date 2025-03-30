"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="rounded-[15px] bg-gradient-to-b from-[#9C52F2] to-[#4C52FB] p-[1px] w-full">
      <div
        className="rounded-[15px] bg-[#1A1037] w-full flex flex-col items-center xsmall:p-[5rem] p-[1rem] "
        data-testid="register-page"
      >
        <h1 className="h2 text-white uppercase mb-[4rem]">Register</h1>

        <form
          className="w-full flex items-center justify-center flex-col"
          action={formAction}
        >
          <div className="flex flex-col small:w-[80%] w-full gap-[1rem]">
            <Input
              topLabel="first name"
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              topLabel="last name"
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
            <Input
              topLabel="email adress"
              label="Email"
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
            />
            <Input
              topLabel="phone"
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
            />
            <Input
              topLabel="password"
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
            />
          </div>
          <ErrorMessage error={message} data-testid="register-error" />
          <span className="text-center details text-white opacity-[0.7] mt-6">
            By creating an account, you agree to Medusa Store&apos;s{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </span>
          <SubmitButton
            className="w-[270px] h-[60px] rounded-[100px] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] mt-6 uppercase menu-body"
            data-testid="register-button"
          >
            Register
          </SubmitButton>
        </form>
        <span className="text-center text-white menu-body mt-8">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text text-transparent"
          >
            Login here
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
