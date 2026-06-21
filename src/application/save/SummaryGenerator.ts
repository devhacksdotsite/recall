export class SummaryGenerator {
  generate(input: string): string {
    const date = new Date()
      .toISOString()
      .split("T")[0];

    return `
      ## ${date}

      Summary:
      ${input.trim()}

      Type:
      General

      Impact:
      Pending classification

    `;
  }
}
