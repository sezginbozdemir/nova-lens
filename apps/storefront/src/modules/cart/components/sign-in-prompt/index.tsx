import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="menu-body text-white">Already have an account?</h2>
        <Text className="body opacity-[0.8] text-white mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="w-[270px] h-[60px] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] rounded-[100px] text-white menu-body uppercase"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
