import Container from "./ui/Container";

export default function Layout({ children }) {
  return (
    <Container>
      <div className="pt-6">
        {children}
      </div>
    </Container>
  );
}
