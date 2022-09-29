/* eslint-disable @typescript-eslint/no-shadow */
// Adapted from: https://www.youtube.com/watch?v=ITogH7lJTyE&ab_channel=Fireship
// Also from: https://stackoverflow.com/a/64408636

export async function asyncFn<PReturn, ArgType extends any[]>(
  promise: (...args: ArgType | any) => Promise<PReturn>,
  args?: ArgType
): Promise<[PReturn | null, unknown | null]> {
  if (args && args.length) {
    console.log("VIEW ARGS", { args });
    try {
      // const tuple = [...args] as const;
      const data = await promise(...args);
      return [data, null];
    } catch (err) {
      return [null, err];
    }
  } else {
    // If there are NO ARGS
    try {
      // const tuple = [...args] as const;

      const data = await promise();
      return [data, null];
    } catch (err) {
      return [null, err];
    }
  }
}
