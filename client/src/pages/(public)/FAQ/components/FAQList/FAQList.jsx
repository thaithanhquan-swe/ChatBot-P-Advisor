import FAQItem from '../FAQItem/FAQItem';

const FAQList = ({ faqs, isLoading, expandedId, searchTerm, onToggle, onAskInChat }) => {
  if (isLoading)
    return <div className='py-10 text-center italic text-gray-500'>Đang tải dữ liệu...</div>;

  if (faqs.length === 0) {
    return (
      <div className='py-10 text-center italic text-gray-500'>
        Không tìm thấy câu hỏi phù hợp với từ khóa &quot;{searchTerm}&quot;.
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isExpanded={expandedId === faq.id}
          onToggle={() => onToggle(faq.id)}
          onAskInChat={onAskInChat}
        />
      ))}
    </div>
  );
};

export default FAQList;
