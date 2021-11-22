import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const { locales, pathname } = router;
  return (
    <nav>
      {locales?.map((loc) => (
        <Link key={loc} href={pathname} locale={loc}>
          {loc}
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
