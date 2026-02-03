import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GuestMessage {
  id: number;
  name: string;
  message: string;
}

export default function GuestBook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const messagesPerPage = 3;
  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const startIndex = currentPage * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lines = newValue.split('\n');
    
    // 3줄까지만 허용, 65자까지만 허용
    if (lines.length <= 3 && newValue.length <= 65) {
      setMessage(newValue);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      return;
    }

    const newMessage: GuestMessage = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
    };

    setMessages([newMessage, ...messages]);
    setName('');
    setMessage('');
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* Guest_Write - Input Area */}
      <div className="absolute contents left-[41px] top-[8836px]" data-name="Guest_Write">
        {/* Name Input */}
        <div className="absolute contents left-[41px] top-[8836px]" data-name="Guest_Write_Name">
          <div className="absolute bg-white h-[33px] left-[41px] rounded-[10px] top-[8836px] w-[311px]" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="absolute font-['Libre_Baskerville:Bold','Noto_Sans_KR:Bold',sans-serif] h-[25px] leading-[25px] left-[63px] text-[15px] top-[8840px] w-[267px] bg-transparent border-none outline-none placeholder:text-[#b8b8b8] text-black"
            style={{ fontVariationSettings: "'wght' 700" }}
            maxLength={20}
          />
        </div>

        {/* Message Input */}
        <div className="absolute contents left-[41px] top-[8877px]" data-name="Guest_Write_Message">
          <div className="absolute bg-white h-[102px] left-[41px] rounded-[10px] top-[8877px] w-[311px]" />
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="메시지"
            className="absolute font-['Libre_Baskerville:Bold','Noto_Sans_KR:Bold',sans-serif] h-[75px] leading-[25px] left-[61px] text-[15px] top-[8891px] w-[269px] bg-transparent border-none outline-none resize-none placeholder:text-[#b8b8b8] text-black"
            style={{ fontVariationSettings: "'wght' 700" }}
            maxLength={65}
          />
        </div>

        {/* Submit Button */}
        <div 
          className="absolute contents left-[49px] top-[8993px] cursor-pointer" 
          data-name="Guest_Write_Button"
          onClick={handleSubmit}
        >
          <div className="absolute bg-[#95ab53] h-[30.235px] left-[49px] rounded-[30px] top-[8993px] w-[295px]" />
          <p className="-translate-x-1/2 absolute font-['Noto_Sans_KR:Bold',sans-serif] font-bold h-[29.072px] leading-[25px] left-[196px] text-[14px] text-center text-white top-[8995px] w-[52px] whitespace-pre-wrap pointer-events-none">
            작성하기
          </p>
        </div>
      </div>

      {/* Guest_Submit - Message List Area */}
      <div className="absolute contents left-[41px] top-[9078px]" data-name="Guest_Submit">
        {messages.length === 0 ? (
          // Empty State
          <div className="absolute left-[41px] top-[9078px] w-[311px] h-[393px] flex items-center justify-center">
            <p className="font-['Noto_Sans_KR:Regular',sans-serif] text-[14px] text-black text-center opacity-50">
              아직 작성된 메시지가 없습니다
            </p>
          </div>
        ) : (
          <>
            {/* Message Cards */}
            {currentMessages.map((msg, index) => {
              const topPosition = 9078 + index * 135;
              return (
                <div key={msg.id} className="absolute contents left-[41px]" style={{ top: `${topPosition}px` }}>
                  <div 
                    className="absolute bg-white rounded-[10px] w-[311px] min-h-[123px]" 
                    style={{ 
                      left: '41px', 
                      top: `${topPosition}px`,
                      padding: '12px 22px'
                    }}
                  />
                  <div className="absolute left-[58px]" style={{ top: `${topPosition + 11}px` }}>
                    <p className="font-['Libre_Baskerville:Bold',sans-serif] text-[13px] text-black mb-0">
                      FROM.
                    </p>
                  </div>
                  <div className="absolute left-[111px]" style={{ top: `${topPosition + 11}px` }}>
                    <p className="font-['Libre_Baskerville:Bold','Noto_Sans_KR:Bold',sans-serif] text-[15px] text-black mb-0" style={{ fontVariationSettings: "'wght' 700" }}>
                      {msg.name}
                    </p>
                  </div>
                  <div 
                    className="absolute left-[63px] w-[269px]" 
                    style={{ top: `${topPosition + 39}px` }}
                  >
                    <p className="font-['Libre_Baskerville:Regular','Noto_Sans_KR:Regular',sans-serif] text-[14px] text-black leading-[25px] break-words whitespace-pre-wrap" style={{ fontVariationSettings: "'wght' 400" }}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="absolute left-[41px] top-[9483px] w-[311px] flex items-center justify-center gap-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="text-black disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  aria-label="이전 페이지"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPage ? 'bg-black w-6' : 'bg-black/30'
                      }`}
                      aria-label={`${index + 1}페이지`}
                    />
                  ))}
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="text-black disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  aria-label="다음 페이지"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
