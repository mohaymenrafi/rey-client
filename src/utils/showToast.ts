import { toast } from "sonner";

export function successToast(message: string) {
	return toast.success(message);
}
