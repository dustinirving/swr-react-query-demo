const todoQueryKeys = {
  all: ["todos"] as const,
  edit: (id: number) => [...todoQueryKeys.all, "edit", id] as const,
};

export default todoQueryKeys;
