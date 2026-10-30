package com.personalsite.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personalsite.entity.Message;
import com.personalsite.mapper.MessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageMapper messageMapper;

    public Message submit(Message message) {
        message.setId(null);
        message.setCreateTime(null);
        messageMapper.insert(message);
        return message;
    }

    public List<Message> list() {
        QueryWrapper<Message> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("create_time");
        return messageMapper.selectList(wrapper);
    }

    public Page<Message> page(long current, long size) {
        QueryWrapper<Message> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("create_time");
        return messageMapper.selectPage(new Page<>(current, size), wrapper);
    }

    public boolean delete(Long id) {
        return messageMapper.deleteById(id) > 0;
    }
}
