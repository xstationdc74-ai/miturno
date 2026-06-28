import LoginClient from "./LoginClient";

type Props = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: Props) {
  const { next } = await searchParams;

  return (
    <LoginClient
      next={next ?? "/asalvo"}
    />
  );
}