export function extractTime(dateString: any) {
	const currentDate = new Date();
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());

	// Kiểm tra nếu dateString đã qua ngày hiện tại 1 ngày trở đi

	if (date > currentDate) {
		return `${hours}:${minutes}`;
	} else {
		const dayOfWeek = [
			'Chủ Nhật',
			'Thứ Hai',
			'Thứ Ba',
			'Thứ Tư',
			'Thứ Năm',
			'Thứ Sáu',
			'Thứ Bảy',
		];
		const dayIndex = date.getDay();
		const dayName = dayOfWeek[dayIndex];
		return `${dayName}: ${hours}:${minutes}`;
	}
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: any) {
	return number.toString().padStart(2, '0');
}
