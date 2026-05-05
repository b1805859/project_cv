package com.hius.erms.client;

import com.hius.erms.io.MomoCreateRequest;
import com.hius.erms.io.MomoCreateResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "momo", url = "${momo.end-point}")
public interface MomoApi {
  @PostMapping("/create")
  MomoCreateResponse createMomoQR(@RequestBody MomoCreateRequest momoCreateRequest);
}
