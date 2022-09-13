import { ReactStateParser } from "./ReactStateParser";
import { checklistWithFeebackHints, dropdownWithFeedbackHints } from "./mockData/problemTestData";

describe("Check Markdown Parser", () => {
  test("Test Multiselect with hints and feedback", () => {
    let markdown = new ReactStateParser(checklistWithFeebackHints.problem).getMarkdown();
    expect(markdown).toBe(checklistWithFeebackHints.markdown);
  });
  test("Test Dropdown with hints and feedback", () => {
    let markdown = new ReactStateParser(dropdownWithFeedbackHints.problem).getMarkdown();
    // console.log(markdown);
    expect(markdown).toBe(dropdownWithFeedbackHints.markdown);
  });
})
