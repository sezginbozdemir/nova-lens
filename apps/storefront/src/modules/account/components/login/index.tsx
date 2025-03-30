import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="rounded-[15px] bg-gradient-to-b from-[#9C52F2] to-[#4C52FB] p-[1px] w-full">
      <div
        className="rounded-[15px] bg-[#1A1037] w-full flex flex-col items-center xsmall:p-[5rem] p-[1rem]"
        data-testid="login-page"
      >
        <h1 className="h2 text-white uppercase mb-[4rem]">Login to account </h1>

        <form
          className="w-full flex items-center justify-center flex-col"
          action={formAction}
        >
          <div className="flex flex-col small:w-[80%] w-full gap-[2rem]">
            <Input
              label="Email"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
              topLabel="email adress"
            />
            <Input
              label="Password"
              topLabel="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
            />
            <div className="menu-body self-start mt-[-0.5rem] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text text-transparent">
              Forgot password
            </div>
          </div>
          <ErrorMessage error={message} data-testid="login-error-message" />

          <SubmitButton
            data-testid="sign-in-button"
            className="w-[270px] h-[60px] rounded-[100px] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] mt-6 uppercase menu-body"
          >
            Login
          </SubmitButton>
        </form>
        <span className="text-center text-white menu-body mt-8">
          Dont have an account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text text-transparent"
            data-testid="register-button"
          >
            Register now
          </button>
        </span>
      </div>
    </div>
  )
}

export default Login
