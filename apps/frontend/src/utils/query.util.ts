import { QueryParamSchema } from '@/lib/schemas/query.schema';

type MutateParamsOptions = { url: string } & (
  | { type: 'set' | 'append'; params: Record<string, string> }
  | { type: 'delete'; params: string[] }
);

export class Query {
  public static mutateParamsToURL({ url, params, type }: MutateParamsOptions) {
    try {
      const result = new URL(url);
      const resultParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        const parsed = type === 'delete' ? QueryParamSchema.parse(key) : QueryParamSchema.parse(value);

        if (type === 'set') {
          resultParams.set(key, parsed);
        } else if (type === 'append') {
          resultParams.append(key, parsed);
        } else if (type === 'delete') {
          resultParams.delete(key);
        }
      });

      result.search = resultParams.toString();
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
