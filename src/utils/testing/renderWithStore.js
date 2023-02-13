import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const renderWithStore = (component) =>
  render(<Provider store={store}>{component}</Provider>);

export default renderWithStore;
