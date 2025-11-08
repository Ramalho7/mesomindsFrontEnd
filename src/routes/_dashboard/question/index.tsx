import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/question/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_dashboard/question/"!
      <div>
        <Link to="/question/createQuestion">adicionar question</Link>
      </div>
      <div>Lista question</div>
      <div>remover e editar question</div>
    </div>
  );
}
