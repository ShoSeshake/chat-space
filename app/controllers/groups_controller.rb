class GroupsController < ApplicationController
  def new
  end

  def create
    group_params
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.require().permit()
  end
end
