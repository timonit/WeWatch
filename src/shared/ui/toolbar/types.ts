import { Component } from 'vue';

export interface ITool {
  name: string;
  handler(event: Event): void;
}
