---
sidebar_position: 4
sidebar_label: Load Balancer
title: "Load Balancer"
keywords:
- Load Balancer
---

<head>
  <link rel="canonical" href="https://docs.harvesterhci.io/v1.6/networking/loadbalancer"/>
</head>

_Available as of v1.2.0_

The Hypervisor load balancer (LB) is a built-in Layer 4 load balancer that distributes incoming traffic across workloads deployed on Hypervisor virtual machines (VMs) or guest Kubernetes clusters.

## VM load balancer

### Features
Hypervisor VM load balancer supports the following features:

- **Address assignment:** Get the LB IP address from a DHCP server or a pre-defined IP pool.
- **Protocol support:** Supports both TCP and UDP protocols for load balancing.
- **Multiple listeners:** Create multiple listeners to handle incoming traffic on different ports or with other protocols.
- **Label selector:** The LB uses label selectors to match the backend servers. Therefore, you must configure the corresponding labels for the backend VMs you want to add to the LB.
- **Health check:** Only send traffic to healthy backend instances.
 
### Limitations
Hypervisor VM load balancer has the following limitations:

- **Namespace restriction:** This restriction facilitates permission management and ensures the LB only uses VMs in the same namespace as the backend servers.
- **IPv4-only:** The LB is only compatible with IPv4 addresses for VMs.
- **Guest agent installation:** Installing the guest agent on each backend VM is required to obtain IP addresses. 
- **Connectivity Requirement:** Network connectivity must be established between backend VMs and Hypervisor hosts. When a VM has multiple IP addresses, the LB will select the first one as the backend address.
- **Access Restriction:** The VM LB address is exposed only within the same network as the Hypervisor hosts. To access the LB from outside the network, you must provide a route from outside to the LB address.

:::note

Hypervisor VM load balancer doesn't support Windows VMs because the guest agent is not available for Windows VMs.

:::

### How to create 
To create a new Hypervisor VM load balancer:
1. Go to the **Networks > Load Balancers** page and select **Create**.
1. Select the **Namespace** and specify the **Name**.
1. Go to the **Basic** tab to choose the IPAM mode, which can be **DHCP** or **IP Pool**. If you select **IP Pool**, prepare an IP pool first, specify the IP pool name, or choose **auto**. If you choose **auto**, the LB automatically selects an IP pool according to [the IP pool selection policy](/networking/ippool.md/#selection-policy).
![](/img/v1.2/networking-hv/create-lb-01.png)
1. Go to the **Listeners** tab to add listeners. You must specify the **Port**, **Protocol**, and **Backend Port** for each listener.
![](/img/v1.2/networking-hv/create-lb-02.png)
1. Go to the **Backend Server Selector** tab to add label selectors. To add the VM to the LB, go to the **Virtual Machine > Instance Labels** tab to add the corresponding labels to the VM.
![](/img/v1.2/networking-hv/create-lb-03.png)
1. Go to the **Health Check** tab to enable health check and specify the parameters, including the **Port**, **Success Threshold**, **Failure Threshold**, **Interval**, and **Timeout** if the backend service supports health check. Refer to [Health Checks](#health-checks) for more details.
![](/img/v1.2/networking-hv/create-lb-04.png)

### Health Checks
The Hypervisor load balancer supports TCP health checks. You can specify the parameters in the Hypervisor UI if you've enabled the `Health Check` option.

![](/img/v1.2/networking-hv/health-check.png)

| Name                           | Value Type | Required | Default | Description |
|:-------------------------------|:-----------|:---|:--------|:---|
| Health Check Port              | int        | true | N/A     | Specifies the port. The prober will access the address composed of the backend server IP and the port.
| Health Check Success Threshold | int     | false | 1       | Specifies the health check success threshold. Disabled by default. The backend server will start forwarding traffic if the number of times the prober continuously detects an address successfully reaches the threshold.
| Health Check Failure Threshold | int     | false | 3       | Specifies the health check failure threshold. Disabled by default. The backend server will stop forwarding traffic if the number of health check failures reaches the threshold.
| Health Check Period            | int     | false | 5       |  Specifies the health check period in seconds. Disabled by default.
| Health Check Timeout           | int     | false | 3       | Specifies the timeout of every health check in seconds. Disabled by default.

## Guest Kubernetes cluster load balancer
In conjunction with Hypervisor Cloud Provider, the Hypervisor load balancer provides load balancing for LB services in the guest cluster.
   ![](/img/v1.2/networking-hv/guest-kubernetes-cluster-lb.png)
When you create, update, or delete an LB service on a guest cluster with Hypervisor Cloud Provider, the Hypervisor Cloud Provider will create a Hypervisor LB automatically.

For more details, refer to [Hypervisor Cloud Provider](/rancher/cloud-provider.md).
