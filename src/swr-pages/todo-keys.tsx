const todoQueryKeys = {
  all: ["todos"] as const,
  edit: (id: string) => [...todoQueryKeys.all, "edit", id] as const,
};

export default todoQueryKeys;
