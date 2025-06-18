export abstract class Fetcher<T> {
  isFetched = true;

  data: T | undefined;

  abstract getURL(): string;

  async fetch(): Promise<T> {
    try {
      const url = this.getURL();
      this.data = await $fetch<T>(url);
      this.isFetched = true;

      return this.data;
    } catch (err) {
      this.isFetched = false;

      throw err;
    }
  }
}
