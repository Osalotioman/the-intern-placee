import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { MyLink } from "../components/ui/link";
import { Logo } from "../components/ui/logo";

export default function Signup() {
	return (
		<div className="min-h-dvh flex items-center justify-center">
			<Card className="max-w-lg w-full p-6 space-y-6">
				<div className="w-fit">
          <Logo />
        </div>
				<div className="text-center space-y-4">
					<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
						Create an account
					</h1>
					<Button className="w-full bg-white text-background-main hover:bg-white/80">
						<img
							src="/images/google.png"
							alt="Google Icon"
							className="size-5 mr-4"
							width={40}
							height={40}
						/>{" "}
						Using Google
					</Button>
					<div className="flex gap-x-4 items-center">
						<div className="h-px w-full bg-white/60"></div>
						<p className="text-white">or</p>
						<div className="h-px w-full bg-white/60"></div>
					</div>
				</div>
				<div>
					<form>
						<div className="space-y-6">
							<div className="space-y-3">
								<label htmlFor="name" className="block font-medium text-">
									Name
								</label>
								<Input type="name" id="name" name="fullName" />
							</div>
							<div className="space-y-3">
								<label htmlFor="email" className="block font-medium text-">
									Email address
								</label>
								<Input type="email" id="email" name="email" />
							</div>
							<div className="space-y-3">
								<label htmlFor="password" className="block font-medium text-">
									Password
								</label>
								<Input type="password" id="password" name="password" />
							</div>
							<div className="pt-3">
								<Button className="w-full bg-accent hover:bg-accent">
									Create account
								</Button>
							</div>
						</div>
					</form>
					<div className="pt-4">
						<p className="text-center text-sm">
							Already have an account? <MyLink to="/signin">Sign in</MyLink>
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
