# frozen_string_literal: true

class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @users = @group.users
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      format.html
      format.json
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
