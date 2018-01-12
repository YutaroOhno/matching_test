class MessagesController < ApplicationController
	def show
	  @user = User.find(params[:id])
	  @your_messages = @user.messages.order("created_at DESC")
	  @message = Message.new
	  @my_messages = current_user.messages
	  msg = @your_messages + @my_messages
	  @messages = msg.sort{|a,b| a["created_at"] <=> b["created_at"]}
	  # ここら辺のロジック汚いからなんとかしたい

    respond_to do |format|
	    format.html
		  format.json
	  end
	end

	def create
	  @message = current_user.messages.new(create_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      render :show
    end
	end

	private

	def create_params
		params.require(:message).permit(:body)
	end
end
