import { useRouter } from "next/router"
import Link from "next/link"

export default function Headers() {
  const router = useRouter()

  function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
       })
    }
  }
  return (
    <header className="header absolute">
      <Link href="/">
        <div className="flex items-center justify-start gap-2">
          <p className="text-[#222222] font-extrabold text-xl">Plato</p>
        </div>
      </Link>
      {router.pathname === "/" && (
        <div className="flex font-semibold gap-12 md:gap-12 text-[#212121] lg:text-white">
          <p className="hover:underline cursor-pointer" onClick={() => smoothScroll("how")}>How?</p>
          <p className="hover:underline cursor-pointer" onClick={() => smoothScroll("features")}>Why?</p>
        </div>
      )}
    </header>
  )
}
