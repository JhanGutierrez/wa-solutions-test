import { useEffect } from "react";
import Table from "./components/Table/Table";
import Summary from "./components/Summary";
import { useIsLoading, useLoadData } from "./store/index";
import Loader from "./components/Loader";

function App() {
  const isLoading = useIsLoading();
  const loadData = useLoadData();

  useEffect(() => {
    loadData().then(() => {
      console.info("Data loaded!");
    });
  }, [loadData]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen py-4">
      <main className="px-2 flex flex-col gap-8 max-w-screen-2xl mx-auto">
        <section>
          <Table />
        </section>

        <section>
          <Summary />
        </section>
      </main>
    </div>
  );
}

export default App;
