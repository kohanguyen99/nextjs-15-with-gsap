import TransitionLink from "@/components/molecules/gsap/TransitionLink";

const AppHeader = () => {
  return (
    <header className="fixed z-50 top-0 left-0 w-full" id="header">
      <div className="p-5 lg:px-10">
        <div className="flex justify-between">
          <div>
            <TransitionLink href="/" label="Go home" />
          </div>
          <div>
            <ul className="flex gap-5">
              <li>
                <TransitionLink href="/gsap" label="Gsap Page" />
              </li>
              <li>
                <TransitionLink href="/gsap#pink" label="Gsap Page With Hash" />
              </li>
              <li>
                <TransitionLink
                  href="/about#blue"
                  label="About Page At Blue Section"
                />
              </li>
              <li>
                <TransitionLink href="/page-visibility" label="Page Visibility" />
              </li>
              <li>
                <TransitionLink href="/without-lenis" label="Modal" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
