export const extractingSelectedValue = (
  data: { code: string; name?: string; value?: string }[],
  selectedValue: string
) => {
  return data.filter((data) => selectedValue === data.code).pop();
};
